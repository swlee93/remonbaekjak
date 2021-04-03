async function getSettings(parent, args, context) {
  return context.prisma.settings.upsert({
    where: { userId: context.user.id },
    update: {},
    create: { userId: context.user.id },
  })
}
async function updateSettings(parent, args, context) {
  const { github_personal_access_token } = args.settingsInput
  return context.prisma.settings.update({
    where: { userId: context.user.id },
    data: {
      github_personal_access_token,
    },
  })
}

module.exports = { getSettings, updateSettings }
