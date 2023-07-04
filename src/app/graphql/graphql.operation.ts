import { gql } from 'apollo-angular';

export const CREATE_USER = gql`
  mutation (
    $email: String!
    $password: String!
    $role: Int!
    $firstName: String!
    $lastName: String!
    $gender: Int
    $birthday: String
  ) {
    createUser(
      email: $email
      password: $password
      role: $role
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      birthday: $birthday
    ) {
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($id: Int!, $detail: Info!) {
    updateUser(id: $id, detail: $detail) {
      message
      status
    }
  }
`;

export const GET_ALL_USER = gql`
  {
    users {
      id
      email
      status
      role
      firstName
      lastName
      gender
      birthday
    }
  }
`;

export const GET_USER = gql`
  query ($id: Int!) {
    user(id: $id) {
      id
      email
      status
      role
      firstName
      lastName
      gender
      birthday
    }
  }
`;

export const GET_ALL_TEACHER = gql`
  {
    teachers {
      id
      email
      status
      role
      firstName
      lastName
      gender
      birthday
    }
  }
`;
export const GET_ALL_STUDENT = gql`
  {
    students {
      id
      email
      status
      role
      firstName
      lastName
      gender
      birthday
    }
  }
`;

export const DELETE_USER = gql`
  mutation ($id: Int!) {
    deleteUser(id: $id) {
      message
      status
    }
  }
`;

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      me {
        id
        firstName
        lastName
        role
        email
        password
        gender
        birthday
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ($currentPwd: String!, $newPwd: String!) {
    changePassword(payload: { currentPwd: $currentPwd, newPwd: $newPwd }) {
      message
    }
  }
`;
