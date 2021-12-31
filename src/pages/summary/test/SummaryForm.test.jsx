import { render, screen,waitForElementToBeRemoved } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from "@testing-library/user-event";

test('Checking the checkbox enables a button', () => {
    render(<SummaryForm/>);
    const button =screen.getByRole("button", {name:/confirm order/i});
    const checkbox = screen.getByRole("checkbox", {name:/terms and conditions/i});
    // Assert disabled button
    expect(button).toBeDisabled();
    expect(checkbox).not.toBeChecked();
    // Fire the checkbox
    userEvent.click(checkbox)
    // Enable de checkbox
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
    userEvent.click(checkbox);
    expect(button).toBeDisabled();
    expect(checkbox).not.toBeChecked();
}
   
)

test('popover responds to hover', async()=>{
    render(<SummaryForm/>);
    // popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();
    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(()=>screen.queryByText(/no ice cream will actually be delivered/i))


})
