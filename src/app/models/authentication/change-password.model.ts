export interface ChangePassword {
  token: string;
  newPassword: string;
}

export interface RecoveryTokenParams
  extends Omit<ChangePassword, 'newPassword'> {}
