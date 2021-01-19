# permissions.app

An app that automatically grants teams the right permission when a repository is created within a GitHub organization

## Usage

Create a `permissions.app.yml` at the root of a `.github-private` repository within your organization, with an entry for each permission pointing to an array of teams. These teams will receive the above permission on each newly created repository. 
Exemple: 

```yaml
admin: 
  - team3
pull: 
  - team1
  - team2
```

Permissions values are: 
- `pull` - team members can pull, but not push to or administer this repository.
- `push` - team members can pull and push, but not administer this repository.
- `admin` - team members can pull, push and administer this repository.
- `maintain` - team members can manage the repository without access to sensitive or destructive actions. Recommended for project managers. Only applies to repositories owned by organizations.
- `triage` - team members can proactively manage issues and pull requests without write access. Recommended for contributors who triage a repository. Only applies to repositories owned by organizations.

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t permission-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> permission-bot
```

## Contributing

If you have suggestions for how permission-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2021 Alain Hélaïli <helaili@github.com>
