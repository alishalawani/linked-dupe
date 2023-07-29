import gql from 'graphql-tag';

export const LOAD_USERS_QUERY = gql`
  {
    users {
      email
      id
      firstName
      lastName
      avatar
    }
  }
`;

export interface iUser {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
export interface LoadUsersQueryResponse {
  users: iUser[];
  loading: boolean;
}
