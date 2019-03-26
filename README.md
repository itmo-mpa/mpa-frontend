# MPA-Frontend
Hype driven development

# Development

### Requirements

1. nvm ([Mac](https://github.com/creationix/nvm), [Win](https://github.com/coreybutler/nvm-windows))
2. [Yarn](https://yarnpkg.com/en/docs/install)

### Setup

1. Install Node with needed version

```bash
$ nvm install
```

2. Install npm dependencies

```bash
$ yarn install --frozen-lockfile
```

### Testing and linting

```bash
$ yarn test
$ yarn lint
```

If you don't want watch mode during testing, use:

```bash
$ yarn test:ci
```

### Commit

We use [conventional commits](https://www.conventionalcommits.org). To commit your changes, add them using `git add` command.

Then run `yarn commit` command and follow the prompt.

[commitizen](https://github.com/commitizen) package is used for prompt and [commitlint](https://github.com/commitizen) package is used for linting commit messages.
