//how we create our own custom endpoints - not that common or useful anymore
//because nowwe have server actions
//when you want to protect your supabase operations
//must be called the names of the http verb GET POST PUT PATCH
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

//create http verbs and create on route handler for each of those verbs
export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    //web standard features
    //we can also use some standard nextjs Response but check that in the api
    return Response.json({
      cabin,
      bookedDates,
    });
  } catch (err) {
    return Response.json({ message: `Cabin not found ${err}` });
  }
}
export async function POST() {}
