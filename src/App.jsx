import Header from "./components/Header";
import Form from "./components/Form";
import FormBox from "./components/FormBox";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Results from "./components/Results";

function App() {
  return (
    <section className="main">
      <Header />
      <FormBox>
        <Form>Fighter 1</Form>
        <Form>Fighter 2</Form>
        <Button addClass={"btn--submit-fighters"}>Predict</Button>
      </FormBox>
      <Results />
      <Footer />
    </section>
  );
}

export default App;
