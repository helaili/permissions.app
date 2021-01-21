const yaml = require('js-yaml')
const { createProbot } = require('probot')

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  app.log.info('Yay, the app was loaded!')
  
  app.on('repository.created', async (context) => {
    const owner = context.payload.repository.owner.login
    const repo = context.payload.repository.name
    context.log.debug(`Repository ${repo} created in org ${owner}`)
    console.log(`Repository ${repo} created in org ${owner}`)
    
    // Loading the setting file in <org>/.github-private/permissions.app.yml
    return context.octokit.repos.getContent({
      'owner': owner,
      'repo': '.github-private',
      'path': 'permissions.app.yml'
    }).then((settingFile) => {
      context.log.debug(`Received content ${settingFile.data.content} with encoding ${settingFile.data.encoding}`)
      const buff = Buffer.from(settingFile.data.content, settingFile.data.encoding) // encoding should be 'base64'
      const settings = yaml.load(buff.toString())
      context.log.debug(`Settings retrieved: ${JSON.stringify(settings)}`)
      console.log(`Settings retrieved: ${JSON.stringify(settings)}`)

      // Now applying the settings
      for (const [permission, teamArray] of Object.entries(settings)) {
        for(const team of teamArray) {
          context.log.debug(`Setting ${permission} permission to team ${team} on repo ${repo} in org ${owner}`)
          console.log(`Setting ${permission} permission to team ${team} on repo ${repo} in org ${owner}`)
          context.octokit.teams.addOrUpdateRepoPermissionsInOrg({
            'org': owner,
            'team_slug': team,
            'owner': owner,
            'repo': repo,
            'permission': permission
          }).catch((error) => {
            console.log(`Failed to set permission ${permission} for team ${team} on ${owner}/${repo} with message: ${error.message}`)
            context.log.error(`Failed to set permission ${permission} for team ${team} on ${owner}/${repo} with message: ${error.message}`)
            context.log.error(error)
          })
        }
      }
    }).catch((error) => {
      console.log(`Error loading the settings : ${error.message}`)
      context.log.error(`Error loading the settings : ${error.message}`)
    })
  })

}
