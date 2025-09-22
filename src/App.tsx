
// ...existing code...
import Header from './components/header';
import Hero from './components/hero';
import Services from './components/services';
import Portfolio from './components/portfolio';
import About from './components/about';
import Reviews from './components/reviews';
import Contact from './components/contact';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
