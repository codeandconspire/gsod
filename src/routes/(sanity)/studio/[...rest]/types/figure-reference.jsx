import FigureReference, {
  FigureReferenceIcon
} from '../components/FigureReference.jsx'
import { defineType } from 'sanity'

export default defineType({
  name: 'figureReference',
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
})
