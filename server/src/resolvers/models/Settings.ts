const parseSettings = async (original: any = {}) => {
  let github_repositories = []

  if (original.github_repositories) {
    github_repositories = original.github_repositories.split(',')
  }
  return { ...original, github_repositories }
}

async function getSettings(parent, args, context) {
  return context.prisma.settings
    .upsert({
      where: { userId: context.user.id },
      update: {},
      create: { userId: context.user.id },
    })
    .then(parseSettings)
}
async function updateSettings(parent, args, context) {
  const { github_personal_access_token, github_repositories } = args.settingsInput

  return context.prisma.settings
    .update({
      where: { userId: context.user.id },
      data: {
        github_personal_access_token,
        github_repositories: (github_repositories && github_repositories.join(',')) || '',
      },
    })
    .then(parseSettings)
}

export { getSettings, updateSettings }
