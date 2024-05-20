import { AutocompleteBaseBackEnd } from '../autocomplete-base-back-end'
import { AutocompleteValueBackEndCommonProps } from '../autocomplete-base-back-end/interface'

interface Films {
  title: string
  year: number
  id: string
}

function ExampleAutoComplete<Multiple extends boolean>({
  onChange,
  value,
  multiple,
  onCustomChange,
}: AutocompleteValueBackEndCommonProps<Films, Multiple>) {
  console.log('value', value)
  return (
    <AutocompleteBaseBackEnd<Films, 'id', 'title', Multiple>
      onChange={onChange}
      options={top100Films}
      keyName="title"
      value={value}
      multiple={multiple}
      onCustomChange={onCustomChange}
      seletedKey={'id'}
      textFieldProps={{
        label: 'Display for',
        required: true,
      }}
    />
  )
}

const top100Films: Films[] = [
  { title: 'The Shawshank Redemption', year: 1994, id: '1' },
  { title: 'The Godfather', year: 1972, id: '2' },
  { title: 'The Godfather: Part II', year: 1974, id: '3' },
  { title: 'The Dark Knight', year: 2008, id: '4' },
  { title: '12 Angry Men', year: 1957, id: '5' },
  { title: "Schindler's List", year: 1993, id: '6' },
  { title: 'Pulp Fiction', year: 1994, id: '7' },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    id: '8',
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966, id: '9' },
  { title: 'Fight Club', year: 1999, id: '10' },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
    id: '11',
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
    id: '12',
  },
  { title: 'Forrest Gump', year: 1994, id: '13' },
  { title: 'Inception', year: 2010, id: '14' },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
    id: '15',
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975, id: '16' },
  { title: 'Goodfellas', year: 1990, id: '17' },
  { title: 'The Matrix', year: 1999, id: '18' },
  { title: 'Seven Samurai', year: 1954, id: '19' },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
    id: '20',
  },
  { title: 'City of God', year: 2002, id: '21' },
  { title: 'Se7en', year: 1995, id: '32' },
  { title: 'The Silence of the Lambs', year: 1991, id: '22' },
  { title: "It's a Wonderful Life", year: 1946, id: '23' },
  { title: 'Life Is Beautiful', year: 1997, id: '24' },
  { title: 'The Usual Suspects', year: 1995, id: '25' },
  { title: 'Léon: The Professional', year: 1994, id: '26' },
  { title: 'Spirited Away', year: 2001, id: '27' },
  { title: 'Saving Private Ryan', year: 1998, id: '28' },
  { title: 'Once Upon a Time in the West', year: 1968, id: '29' },
  { title: 'American History X', year: 1998, id: '30' },
  { title: 'Interstellar', year: 2014, id: '30' },
]

export default ExampleAutoComplete
