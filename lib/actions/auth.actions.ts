"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";

export const signUpWithEmail = async ({
  email,
  password,
  fullName,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email: email, password: password, name: fullName },
    });

    return {
      success: true,
      data: response,
    };
  } catch (e) {
    console.log("sign up failed", e);
    return { success: false, error: "sign up failed" };
  }
};

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log("Sign out failed", e);
        return { success: false, error: "Sign out failed" }
    } 
}

export const signInWithEmail = async ({
    email,
    password,
  }: SignInFormData) => {
    try {
      const response = await auth.api.signInEmail({
        body: { email: email, password: password },
      });
  
      return {
        success: true,
        data: response,
      };
    } catch (e) {
      console.log("sign up failed", e);
      return { success: false, error: "sign up failed" };
    }
  };
