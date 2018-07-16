'a statement of true or false would be passed to the functions'

'state would be false when the component mounts '

'if they are given permission it would be set to true and the component would return component otherwise it would return null and the component would not be returned '

'this also needs to happen again if the components updates during it cycle not just check when it initially loads '




{/* ! -- HOC !-- */}

{let HasPermissions= withPermissions(baseComponent,{permission:'viewContract',contractId:'1'})}

{let HasPermissions= withPermissions([{permission:'viewContract',contractId:'1'}]),baseComponent}
<div>

<p > string method for HOC good method but if you have a page with multiple permissions it would take many props and would not </p>

<HasPermissions permissions='addContract' > {<!--children-->} </HasPermissions> 

<withPermissions permissions={[{permission:'addVendor'}]}
>  </WithPermissions>

<HasPermissions permissions={[{permission:'viewContract',contractId:1},{permission:'addSub'}]}> {<!--children-->}</HasPermissions>

</div> 

{<!-- end of HOC !-->}
<Contract id={1} render={(props) => <span>{props.name}</span>}/>

<WithPermissions role={Role}>

true or false method This method is not very effective when using multiple types of users
<WithPermissions admin={true}> {<!--children-->} </WithPermissions> 

<WithPermissions role="admin"> {<!--children-->} </WithPermissions>

<WithPermissions permission="viewContract" id="1"/>
<WithPermissions permission="viewContract" id={x}/>
<WithPermissions permissions={{permission:'viewContract', contractId:1}}/>


<div>
array of objects method. i like this one the best because you can pass multiple permissions
and roles into the Component
with a very clean way of written it and not having so much clutter.
having an object of arrays lets you easily see the arrays length in the function so you can tell 
if a page has multiple permissions or not
<withPermissions permissions={[{permission:'viewContract',contractId:1},{permission:'addSub'}]} > </withPermissions>
  <!-- only visible to admins OR Prime on contract !--> 
     <div/>
   <!-- !-->
  <!-- only visible to agency! !-->
    <div/>
   <!-- !-->
</div>


<div>
  <h1>Contract Details</h1>
  <WithPermissions admin>Admin Tools!</WithPermissions/>
  <WithPermissions vendor>Vendor Shit!</WIthPermissions>
</div>




<BaseComponet/>



</WithPermisssions >



it can also be a renderProp where i make a toggle function and then just wrap it to the element and toggle it depending on if they have permissions to see the element of not

along with adding functions inside of it to sort 