# NodeJs Search Module!


# How To Use
### Node Ver 14 + Express
Git clone https://github.com/dorman99/movie-search.git
npm i
npm start

# Endpoints Docs

## CMS Module
|              Name  |Endpoint                          |Method                         |
|----------------|-------------------------------|-----------------------------|
|Create Admin|`api/v1/cms/admins`            |`POST`            |
|Login          |`api/v1/cms/login`            |`POST`            |
|Find All Credential Key          |`api/v1/cms/credentials`|`GET`|
|Genereate Credentials | `api/v1/cms/credentials` | `POST`
| Remove Credential | `api/v1/cms/credentials/2` | `DELETE`
| Find All Search Record | `/api/v1/cms/search-loggers` | `GET`
| Find All Search Record By Credential | `api/v1/cms/search-loggers/credentials/:credential` | `GET`

## Search Module
|              Name  |Endpoint                          |Method                         | Query Params |
|----------------|-------------------------------|-----------------------------|-|
|Search|`api/v1/search`            |`POST`            | apikey (mandatory), keyword (mandatory), page (optional)|
|Search Detail         |`api/v1/search/detail/:id`            |`POST`            | apikey (mandatory)|