import TicketsContainer from "./TicketsContainer";
import TrackingContainer from "./TrackingContainer";

function SectionLayout() {
  return (
    <>
      <section className="flex flex-col-reverse md:flex-row justify-around">
        <TicketsContainer />
        <TrackingContainer />
      </section>
    </>
  );
}

export default SectionLayout;
