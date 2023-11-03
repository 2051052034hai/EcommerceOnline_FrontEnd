export const compareUser = (obj1, obj2) => {
  const fieldsToCompare = ['userName', 'email', 'password']

  let isDifferent = false

  for (const field of fieldsToCompare) {
    if (obj1[field] !== obj2[field]) {
      isDifferent = true
      break
    }
  }

  return isDifferent
}
