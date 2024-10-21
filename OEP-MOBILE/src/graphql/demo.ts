/* eslint-disable no-tabs */
import { gql } from '@apollo/client';

export const FIND = gql`
query find($id: String!) {
    find(id: $id) {
    name
    desc
    id
  }
}
`;

export const UPDATE = gql`
mutation updateUserInfo(
	$id: String!
	$params: UserInput!
) {
  updateUserInfo(id: $id, params: $params) {
    code
    message
  }
}
`;
