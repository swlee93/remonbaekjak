const parseSettings = async (original: any = {}) => {
  let github_repositories = []

  if (original.github_repositories) {
    github_repositories = original.github_repositories.split(',')
  }
  return { ...original, github_repositories }
}

async function getSettings(parent, args, context) {
  const userId = context?.userId

  return await context.prisma.settings
    .upsert({
      where: { userId },
      update: {},
      create: { user: { connect: { id: userId } } },
    })
    .then(parseSettings)
}

async function updateSettings(parent, args, context) {
  const { github_personal_access_token, github_repositories } = args.settingsInput
  const userId = context?.userId
  return context.prisma.settings
    .update({
      where: { userId },
      data: {
        github_personal_access_token,
        github_repositories: (github_repositories && github_repositories.join(',')) || '',
      },
    })
    .then(parseSettings)
}

export { getSettings, updateSettings }
