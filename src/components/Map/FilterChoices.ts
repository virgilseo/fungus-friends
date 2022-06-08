export type Choice = {
  name: string,
  selected: boolean
}

export const colorChoices: Array<Choice> = [
  { name: 'red', selected: false },
  { name: 'green', selected: false },
  { name: 'yellow', selected: false },
  { name: 'blue', selected: false }
]

export const spotChoices: Array<Choice> = [
  { name: 'none', selected: false },
  { name: 'hidden', selected: false },
  { name: 'dotted', selected: false },
  { name: 'dashed', selected: false },
  { name: 'solid', selected: false },
  { name: 'double', selected: false },
  { name: 'groove', selected: false },
  { name: 'ridge', selected: false },
  { name: 'inset', selected: false },
  { name: 'outset', selected: false }
]
