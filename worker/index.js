const amqp = require("amqplib");
const path = require("path");
const puppeteer = require("puppeteer"); // Adicione esta linha
const { v4: uuidv4 } = require("uuid");
const fs = require('fs/promises');

// Caminho do arquivo HTML
const templatePath = path.join(__dirname, "template.html");

async function renderTemplate(templatePath, data) {
    fs.readFile(templatePath, 'utf-8', (err, conteudo) => {
    if (err) {
      console.error("Erro ao ler:", err);
      return err;
    }

    let htmlModificado = conteudo;
    let outputPath;


    const dados = JSON.parse(data.content.toString());

    for (const chave in dados) {
      const valor = dados[chave];
      const regex = new RegExp(`{{${chave}}}`, "g");
      htmlModificado = htmlModificado.replace(regex, valor);
    }
    

    try {
      gerarPDF(htmlModificado, outputPath).then((pdf) => {
        if (!pdf) {
          console.error("Erro ao gerar PDF");
          return;
        }
        console.log(dados);
        const fileName = `${uuidv4()}.pdf`;
        const outputPath = path.join(__dirname, "./storage", fileName);
        console.log(outputPath);
        console.log(pdf);
        fs.writeFileSync(outputPath, pdf);
        console.log("PDF gerado e salvo em:", outputPath);
      });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
    });
  }


async function gerarPDF(htmlContent, outputPath) {

  // Lançando o Puppeteer com as opções --no-sandbox e --disable-setuid-sandbox
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'],});
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdf = await page.pdf({path: outputPath,format: "A4",});
  await browser.close();
  return pdf;
}

// Conecta ao RabbitMQ
const rabbitHost = process.env.RABBITMQ_HOST || "rabbitmq";

(async () => {
  try {
    const connection = await amqp.connect(`amqp://${rabbitHost}`);
    const channel = await connection.createChannel();
    const queue = "diplomasQueue";

    await channel.assertQueue(queue, { durable: true });

    channel.consume(
      queue,
      async (data) => {
        try {
          const dadosAluno = JSON.parse(data.content.toString());
          const html = await renderTemplate(templatePath, dadosAluno);
          const fileName = `${uuidv4()}.pdf`;
          await gerarPDF(html, fileName);
          channel.ack(data); // Confirma o processamento da mensagem
        } catch (error) {
          console.error("Erro ao processar mensagem:", error);
          // Implementar lógica para lidar com erros
          channel.nack(data); 
        }
      },
      { noAck: false } 
    );
  } catch (error) {
    console.error("Erro ao ler mensagem da fila:", error);
  }
})();