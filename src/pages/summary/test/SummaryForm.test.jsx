import { render, screen,fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('Checking the checkbox enables a button', () => {
    render(<SummaryForm/>);
    const button =screen.getByRole("button", {name:/confirm order/i});
    const checkbox = screen.getByRole("checkbox", {name:/terms and conditions/i});
    // Assert disabled button
    expect(button).toBeDisabled();
    expect(checkbox).not.toBeChecked();
    // Fire the checkbox
    fireEvent.click(checkbox)
    // Enable de checkbox
    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
}
   
)
