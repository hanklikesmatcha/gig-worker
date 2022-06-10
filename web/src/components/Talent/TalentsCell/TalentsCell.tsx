import type { FindTalents } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Talents from 'src/components/Talent/Talents'

export const QUERY = gql`
  query FindTalents {
    talents {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No talents yet. '}
      <Link to={routes.newTalent()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ talents }: CellSuccessProps<FindTalents>) => {
  return <Talents talents={talents} />
}
