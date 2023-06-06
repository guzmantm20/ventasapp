import { useEffect, useState } from "react";
import Navigation from "./src/components/Navigation";
import { supabase } from "./src/lib/supabase";
import AuthNavigation from "./src/components/AuthNavigation";
export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const sessionListener = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      sessionListener.unsubscribe();
    };
  }, []);

  return user === null ? (<AuthNavigation/>) : (<Navigation/>)
   
}
