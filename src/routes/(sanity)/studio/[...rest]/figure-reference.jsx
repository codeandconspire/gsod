import FigureReference, {
  FigureReferenceIcon
} from './components/FigureReference.jsx'

export default {
  name: 'figure',
  type: 'object',
  title: 'Reference to figure',
  icon: FigureReferenceIcon,
  fields: [
    {
      name: 'figure',
      type: 'string',
      title: 'Figure',
      components: {
        input: FigureReference
      }
    }
  ]
}
