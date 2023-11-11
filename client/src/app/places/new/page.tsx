"use client"
import Input from "@/app/shared/components/FormElements/Input";
import Button from "@/app/shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "@/app/shared/util/validators";

const NewPlace = () => {
    return ( 
        <div className="pt-20">
            <h1>Add new place.</h1>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={() => console.log('wazzup')}
                />
                <Input
                    id="description"
                    element="input"
                    type="text"
                    label="Description"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid description."
                    onInput={() => console.log('wazzup')}
                />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={() => console.log('wazzup')}
                />
                <Button type="submit">
                    ADD PLACE
                </Button>
        </div>
    );
}
 
export default NewPlace;