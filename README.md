# MyMenu - Frontend Vue.js conectado ao Strapi

## Introdução

Bem-vindo ao projeto **MyMenu**! Este é um front-end de uma aplicação de delivery de comida, construído com Vue.js e Vite. Atualmente, a aplicação é parcialmente funcional e utiliza dados estáticos (mock data) para exibir o cardápio e simular o registro de usuários.


## 🧭 Pré-requisitos Strapi

A instância Strapi deve estar disponível em `http://localhost:1337` e atender:

1. Ter uma Collection Type `Product` (ou `Produto`) com campos:

   * `name` (Text)
   * `description` (Text)
   * `price` (Number/Float)
   * `image` (Media)
2. Permissões públicas (`Public`) para `find` e `findOne` na collection `Product`.
3. Permissão pública para `register` em `Users & Permissions` (para permitir registro).
4. Endpoints de auth padrão do Strapi:

   * `POST /api/auth/local/register` — registra usuário, retorna `{ jwt, user }`
   * `POST /api/auth/local` — login, retorna `{ jwt, user }`

   > Observação: dependendo da versão do Strapi os caminhos podem ser `/api/auth/local/register` e `/api/auth/local` — ajuste conforme sua instância.

---

## 🎯 Objetivo do exercício

Praticar gerenciamento de estado global com Pinia, simulando um sistema de carrinho de compras e a autenticação JWT no frontend, com proteção de rotas usando o Vue Router.

---
## 📝 Descrição

Você vai criar a interface de uma **aplicação de entrega de comida**.  
O usuário poderá:
- Se cadastrar na aplicação.
- Se autenticar na aplicação.
- Visualizar uma lista de pratos disponíveis.
- Adicionar pratos ao carrinho.
- Remover pratos do carrinho.
- Visualizar o total da compra.
  

## 🚀 Requisitos

### 1. Implementar o Cadastro de Usuário

O formulário de cadastro em `/cadastro` (`RegisterView.vue`) atualmente apenas simula um registro. Você irá conectá-lo ao endpoint de registro do Strapi.

Faça uma requisição `POST` para o endpoint `/api/auth/local/register` do Strapi. O Strapi espera um `username`, `email` e `password`. Você pode usar o campo `name` do formulário como `username`. Em caso de sucesso, o Strapi retornará um `jwt` e o objeto do usuário. Utilize esses dados para autenticar o usuário na aplicação imediatamente após o cadastro.

### 2. Implementar o Login de Usuário

Assim como o cadastro, a tela de login (`LoginView.vue`) não tem funcionalidade. Sua tarefa é implementá-la.

### 3. Proteger o Carrinho de Compras

Para garantir que apenas usuários logados possam adicionar itens ao carrinho, você precisa adicionar uma verificação de autenticação.

### 4. Finalizar a Página do Carrinho (`CartView.vue`)

A página do carrinho está usando dados estáticos. Vamos fazê-la funcionar de verdade.

1.  **Exiba os dados reais**: Substitua a lista de itens estática pelos dados vindos decorrentes da ações do usuário..
2.  **Implemente as ações**: Implement as funcionalidades dos botões "Remover" e "Limpar Carrinho"
3.  **Lógica de carrinho vazio**: Implemente a lógica para mostrar uma mensagem amigável quando o carrinho estiver vazio.

### 5. Tornar a Barra de Navegação (`NavBar.vue`) Dinâmica

A barra de navegação precisa refletir o estado de autenticação e o conteúdo do carrinho.

1.  **Exibição condicional**:
    *   O link de "Login" somente se o usuário **não** estiver autenticado.
    *   O nome do usuário (`user.username`) e o link "Sair" somente se o usuário **estiver** autenticado.
    *   A quantidade de itens no carrinho (`totalItems`) ao lado do link "Carrinho".
2.  **Implemente o Logout**: Faça com que o link "Sair" chame a realize o `logout` .

---

## 📌 Observações finais / boas práticas

* Não modifique a instância Strapi de modo a quebrar permissões públicas necessárias (a não ser que saiba reconfigurar).
* Valide inputs no frontend (campo email, senha min length).
* Use `router.push({ name: 'Login', query: { redirect: to.fullPath } })` para melhorar a UX (retornar usuário à página desejada após login).
* Mantenha a separação: **services** para chamadas HTTP, **stores** para estado, **views/components** para UI.

---

