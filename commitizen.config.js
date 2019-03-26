"use strict";

module.exports = {
  types: [
    {value: "build", name: "build:     Сборка проекта или изменения внешних зависимостей"},
    {value: "ci", name: "ci:        Настройка CI и работа со скриптами"},
    {value: "docs", name: "docs:      Обновление документации"},
    {value: "feat", name: "feat:      Добавление нового функционала"},
    {value: "fix", name: "fix:       Исправление ошибок"},
    {value: "perf", name: "perf:      Изменения направленные на улучшение производительности"},
    {value: "refactor", name: "refactor:  Правки кода без исправления ошибок или добавления новых функций"},
    {value: "revert", name: "revert:    Откат на предыдущие коммиты"},
    {value: "style", name: "style:     Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)"},
    {value: "test", name: "test:      Добавление тестов"}
  ],

  scopes: [
    {name: "components"},
    {name: "build"}
  ],

  messages: {
    type: "Choose changes type:",
    scope: "\nChoose changes scope (optional):",
    customScope: "Enter custom scope:",
    subject: "Add short imperative description",
    body: 'Add long description (optional). Use "|" for new line:\n',
    breaking: "Breaking changes list (optional):\n",
    footer: "Any META data (issue number, links, etc):\n",
    confirmCommit: "Is message ok?"
  },

  allowCustomScopes: true,

  allowBreakingChanges: false,

  footerPrefix: "META:",

  subjectLimit: 72
};