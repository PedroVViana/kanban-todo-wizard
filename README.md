# Gerenciador de Tarefas com Kanban

Este é um sistema de gerenciamento de tarefas baseado em Kanban, desenvolvido com React, TypeScript e TailwindCSS. O projeto oferece uma interface intuitiva para organizar tarefas em três estados: A Fazer, Em Progresso e Concluídas.

## Características

- Interface drag-and-drop para mover tarefas entre colunas
- Criação, edição e exclusão de tarefas
- Categorização por prioridade e status
- Design responsivo para desktop e dispositivos móveis
- Armazenamento local dos dados (usando Zustand)
- Suporte a tema claro e escuro
- Interface moderna com animações suaves

## Instalação

Para começar a usar o projeto localmente, siga estes passos:

```bash
# Clonar o repositório
git clone [url-do-repositorio]

# Navegar até a pasta do projeto
cd kanban-todo-wizard

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `/src/components`: Componentes reutilizáveis da interface
- `/src/pages`: Páginas da aplicação
- `/src/hooks`: Hooks personalizados (incluindo gerenciamento de tema)
- `/src/store`: Gerenciamento de estado com Zustand
- `/src/lib`: Funções utilitárias

## Tecnologias Utilizadas

- React 18
- TypeScript
- TailwindCSS
- Zustand (gerenciamento de estado)
- Shadcn UI (componentes)
- Vite (build tool)
- Lucide React (ícones)

## Melhorias Recentes

- Adição de suporte a tema claro/escuro
- Redesign da interface com cores mais modernas
- Melhorias na experiência do usuário com animações
- Adição de ícones para melhor identificação visual
- Otimização para dispositivos móveis

## Desenvolvimento

Para contribuir com o projeto:

1. Crie um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Para dúvidas ou sugestões, abra uma issue no repositório do projeto.
