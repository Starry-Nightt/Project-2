import { gql } from 'apollo-angular';

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      account {
        role
      }
      student {
        id
        firstName
        lastName
        gender
        fullName
      }
      admin {
        id
        firstName
        lastName
        gender
        fullName
      }
      teacher {
        id
        firstName
        lastName
        gender
        fullName
      }
    }
  }
`;

export const REGISTER = gql`
  mutation (
    $email: String!
    $password: String!
    $role: Int!
    $firstName: String!
    $lastName: String!
    $gender: Int!
  ) {
    registerAccount(
      email: $email
      password: $password
      role: $role
      firstName: $firstName
      lastName: $lastName
      gender: $gender
    ) {
      email
      password
    }
  }
`;

export const HELLO = gql`
  query {
    info
  }
`;

export const ACTIVE = gql`
  mutation ($id: ID!) {
    activeAccount(id: $id) {
      status
    }
  }
`;

export const INACTIVE = gql`
  mutation ($id: ID!) {
    inactiveAccount(id: $id) {
      status
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation ($id: ID!, $role: Int!) {
    deleteAccount(id: $id, role: $role) {
      email
    }
  }
`;

export const GET_ALL_STUDENT = gql`
  {
    students {
      id
      firstName
      lastName
      gender
      fullName
      account {
        status
        email
        id
      }
    }
  }
`;

export const GET_ALL_TEACHER = gql`
  {
    teachers {
      id
      firstName
      lastName
      gender
      fullName
      account {
        status
        email
        id
      }
    }
  }
`;

export const GET_ALL_ACCOUNT = gql`
  {
    accounts {
      id
      email
      status
      student {
        fullName
        id
      }
      teacher {
        fullName
        id
      }
      admin {
        fullName
        id
      }
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation ($info: Info!) {
    updateStudent(info: $info) {
      firstName
      lastName
      gender
    }
  }
`;

export const UPDATE_TEACHER = gql`
  mutation ($info: Info!) {
    updateTeacher(info: $info) {
      firstName
      lastName
      gender
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation ($info: Info!) {
    updateAdmin(info: $info) {
      firstName
      lastName
      gender
    }
  }
`;
