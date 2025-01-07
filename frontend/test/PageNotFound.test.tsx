// import { describe } from 'vitest';
// import PageNotFound from './PageNotFound';
// import { render } from 'react-dom';

// describe('PageNotFound', () => {
// });
// it('should include an apologetic message about not finding the page', () => {
//     const { getByText } = render(<PageNotFound />);
//     const apologeticMessage = getByText("Sorry, we couldn't find the page you're looking for.");
//     expect(apologeticMessage).toBeInTheDocument();
// }); it('should show "Page not found" as the secondary heading', () => {
//     const { getByText } = render(<PageNotFound />);
//     const heading = getByText('Page not found');
//     expect(heading).toBeInTheDocument();
//     expect(heading.tagName).toBe('H2');
//     expect(heading).toHaveClass('mb-6 text-2xl text-white');
// }); it('should render a "Go Back" button with an arrow icon', () => {
//     const { getByRole, getByText } = render(<PageNotFound />);
//     const button = getByRole('button', { name: /go back/i });

//     expect(button).toBeInTheDocument();
//     expect(button).toHaveTextContent('Go Back');
//     expect(button.firstChild).toHaveAttribute('data-lucide', 'arrow-left');
// });