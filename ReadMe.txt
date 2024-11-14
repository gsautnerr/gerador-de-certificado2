curl --location 'http://localhost:3000/diplomas' \
--header 'Content-Type: application/json' \
--data '{
  "nome_aluno": "João da Silva",
  "data_conclusao": "2023-11-23",
  "nome_curso": "Ciência da Computação",
  "nacionalidade": "Brasileira",
  "naturalidade": "São Paulo",
  "data_nascimento": "1998-04-12",
  "numero_rg": "123456789",
  "data_emissao": "2020-01-01",
  "assinaturas": [
      {
          "cargo": "Dev",
          "nome": "Gabi"
      }
  ],
  "template_diploma": ""
}'

Rodar o docker compose -d --build para subir o projeto, depois rodar o serviço a api e do worker na mão pois ele demora a subir