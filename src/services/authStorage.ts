import * as Keychain from "react-native-keychain";

const SERVICE = "com.learninghub.auth";

export const authStorage = {
  saveToken: async (token: string): Promise<void> => {
    await Keychain.setGenericPassword("accessToken", token, {
      service: SERVICE,
    });
  },

  getToken: async (): Promise<string | null> => {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICE,
    });

    return credentials ? credentials.password : null;
  },

  clearToken: async (): Promise<void> => {
    await Keychain.resetGenericPassword({
      service: SERVICE,
    });
  },
};
