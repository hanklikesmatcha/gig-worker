import type { FindTalentById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Talent from 'src/components/Talent/Talent'

export const QUERY = gql`
  query FindTalentById($id: Int!) {
    talent: talent(id: $id) {
      profilePhoto
      id
      firstName
      lastName
      mobile
      email
      intro
      location
      createdAt
      updatedAt
      deactivatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Talent not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ talent }: CellSuccessProps<FindTalentById>) => {
  return <Talent talent={talent} />
}
