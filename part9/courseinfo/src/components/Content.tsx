import { CoursePart } from '../types'
import Part from './Part'

const Content = ({ contentList }: { contentList: CoursePart[] }) => {
  return (
    <div>
      {contentList.map(cp => (
        <Part key={cp.name} coursePart={cp} />
      ))}
    </div>
  )
}

export default Content
