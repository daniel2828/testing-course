import {render,screen} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import {OrderDetailsProvider} from "../../../context/OrderDetails";
import OrderEntry from "../OrderEntry";
test('update scoop subtotal when scoops change', async()=>{
    render(<Options optionType="scoops"/>,{wrapper:OrderDetailsProvider})
    // Make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText("Scoops total: $", {exact:false});
    expect(scoopsSubtotal).toHaveTextContent('0.00');
    // Update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole('spinbutton',{name:"Vanilla"})
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput,'1')
    expect(scoopsSubtotal).toHaveTextContent('2.00')
    // Update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {name:"Chocolate"})
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput,'3');
    expect(scoopsSubtotal).toHaveTextContent("8.00")
})
test('update Topping subtotal when toppings change', async()=>{
    /*{name:"Cherries", imagePath: "/images/cherries.png"},
    {name:"M&Ms", imagePath: '/images/m-and-ms.png'},
    {name:"Hot fudge", imagePath: '/images/hot-fudge.png'}*/
    render(<Options optionType="toppings"/>)

    // Make sure total starts out $0.00
    const toppingsSubtotal = screen.getByText("Toppings total: $", {exact:false});
    expect(toppingsSubtotal).toHaveTextContent('0.00');
    // Update vanilla scoops to 1 and check the subtotal
    const cherriesCheck = await screen.findByRole('checkbox',{name:"Cherries"})
    //userEvent.clear(vanillaInput)
    userEvent.click(cherriesCheck)
    expect(toppingsSubtotal).toHaveTextContent('1.50')
    // Update chocolate scoops to 2 and check subtotal
    const mmsInput = await screen.findByRole('checkbox', {name:"M&Ms"})
    //userEvent.clear(mmsInput)
    userEvent.click(mmsInput);
    expect(toppingsSubtotal).toHaveTextContent("3.00")
    userEvent.click(mmsInput);
    expect(toppingsSubtotal).toHaveTextContent("1.5")
    userEvent.click(cherriesCheck)
    expect(toppingsSubtotal).toHaveTextContent('0.00')
})

describe('grand total', ()=>{
    beforeEach(()=>{
        render(<OrderEntry/>);
    })
 
    test('grand total updates properly if scoop is added first',async ()=>{
        //render(<OrderEntry/>);
        const grandTotal = screen.getByRole("heading", {name:/Grand total: \$/});
        expect(grandTotal).toHaveTextContent("0.00");
        const vanillaInput = await screen.findByRole('spinbutton',{name:"Vanilla"});
        const cherriesCheck = await screen.findByRole('checkbox',{name:"Cherries"})
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput,'1');
        expect(grandTotal).toHaveTextContent("2.00");
        userEvent.click(cherriesCheck)
        expect(grandTotal).toHaveTextContent("3.50");
        
    });
    test('grand total updates properly if topping is added first', async ()=>{
        const grandTotal = screen.getByRole("heading", {name:/Grand total: \$/});
        
        const vanillaInput = await screen.findByRole('spinbutton',{name:"Vanilla"});
        const cherriesCheck = await screen.findByRole('checkbox',{name:"Cherries"})
        userEvent.click(cherriesCheck)
        expect(grandTotal).toHaveTextContent("1.50");
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput,'1');
        expect(grandTotal).toHaveTextContent("3.50");
    });
    test('grand total updates properly if item is removed',async ()=>{
        const grandTotal = screen.getByRole("heading", {name:/Grand total: \$/});
        
        const vanillaInput = await screen.findByRole('spinbutton',{name:"Vanilla"});
        const cherriesCheck = await screen.findByRole('checkbox',{name:"Cherries"})
        userEvent.click(cherriesCheck)
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput,'1');
        userEvent.clear(vanillaInput);
        
        userEvent.type(vanillaInput,'0');
        expect(grandTotal).toHaveTextContent("1.50");
        userEvent.click(cherriesCheck);
        expect(grandTotal).toHaveTextContent("0.00")
    });
})