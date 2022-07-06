export const QUERY = gql`
  query FindUserById($id: Int!) {
    user: user(id: $id) {
      id
      email
    }
  }
`

export const Loading = () => <div>Chargement...</div>

export const Empty = () => <div>Utilisateur inconnu</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ user }) => {
  return user.email
}
