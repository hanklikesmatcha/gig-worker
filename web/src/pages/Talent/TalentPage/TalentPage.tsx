import TalentCell from 'src/components/Talent/TalentCell'

type TalentPageProps = {
  id: string
}

const TalentPage = ({ id }: TalentPageProps) => {
  return <TalentCell id={id} />
}

export default TalentPage
