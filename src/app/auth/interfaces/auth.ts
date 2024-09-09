export interface IAuthRequest {
  codUsuario: string
  password: string,
}

export interface IAuthResponse {
  codUsuario: string,
  nomUsuario: string,
  token: string
}
