import { render, screen, cleanup } from "@testing-library/react";
import Footer from "../Footer";


test("should render Footer compontent", () => {
  render(
      <Footer />
  );
  const footerElement = screen.getByTestId("footerlink");
  expect(footerElement).toBeInTheDocument;
});




