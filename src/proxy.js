import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
import { headers } from 'next/headers';
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers() // headers containing the user's session token

});
// console.log(session,"11 no. line ");

if(!session && !session?.user){
  console.log(request.url, "kon path a redirect kore  seita !");
  return NextResponse.redirect(new URL('/login', request.url))
}

}
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ["/all-tutors/:id", "/add-tutor", "/my-tutors", "/my-bookings" ],
}


