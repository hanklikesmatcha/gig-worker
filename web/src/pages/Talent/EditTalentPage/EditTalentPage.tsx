import EditTalentCell from 'src/components/Talent/EditTalentCell'

type TalentPageProps = {
  id: number
}

const EditTalentPage = ({ id }: TalentPageProps) => {
  return <EditTalentCell id={id} />
}

export default EditTalentPage
