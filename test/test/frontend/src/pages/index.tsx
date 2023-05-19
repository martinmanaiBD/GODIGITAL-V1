
import Section1 from "../components/home-1/Section1";
import Section10 from "../components/home-1/Section10";
import Section11 from "../components/home-1/Section11";
import Section12 from "../components/home-1/Section12";
import Section13 from "../components/home-1/Section13";
import AppLayout from "../components/layout/AppLayout";

const IndexPage = () => {
  return (
    <main>
      
      
      <Section1 />
      <Section12 />
      <Section13 />
    </main>
  );
};

IndexPage.layout = AppLayout;

export default IndexPage;
