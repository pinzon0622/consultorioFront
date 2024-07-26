import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

const FooterComponent = () => {
  return (
    <Footer className="bg-transparent absolute bottom-0 " container>
      <FooterCopyright className="text-white" href="#" by="MPS™" year={2024} />
      <FooterLinkGroup>
        <FooterLink className="text-white" href="#">About</FooterLink>
        <FooterLink className="text-white" href="#">Privacy Policy</FooterLink>
        <FooterLink className="text-white" href="#">Licensing</FooterLink>
        <FooterLink className="text-white" href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
};

export default FooterComponent;
