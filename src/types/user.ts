interface UserType {
  token: string;
  jenis_kelompok_masyarakat: string;
  kelompok_masyarakat_id: string;
  kelompok_masyarakat: string;
  role_user: string;
  nama: string;
}

type UserResponseType = {
  token: string;
  jenis_kelompok_masyarakat: string;
  kelompok_masyarakat_id: string;
  kelompok_masyarakat: string;
  role_user: string;
  nama: string;
};

export type { UserType, UserResponseType };
