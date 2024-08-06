import Spinner from "../_components/Spinner";
// having a Loading.js file will activate streaming which will require javascript to be activate in the browser
export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data</p>
    </div>
  );
}
