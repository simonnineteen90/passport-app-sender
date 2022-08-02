const generateData = (quantity) => {
  let i = 0
  const data = []
  const randomFirstNames = ['Boba', 'Obi-wan', 'Luke', 'Simon', 'Darth', 'Han', 'R2', 'Mace', 'Count', 'Bo', 'Baby']
  const randomSurnames = ['Fett', 'Kenobi', 'Skywalker', 'Dunn', 'Vader', 'Solo', 'D2', 'Windu', 'Dooku', 'Katan', 'Yoda']
  const randomNumber = () => Math.floor(Math.random() * randomFirstNames.length)

  while (i < quantity) {
    data.push({
      body: {
        name: `${randomFirstNames[randomNumber()]} ${randomSurnames[randomNumber()]}`,
        dob: '27/12/1977',
        birthLocation: 'A galaxy far far away',
        age: 100,
        nationality: 'bounty hunter'
      }
    })
    i++
  }
  return data
}
module.exports = generateData
