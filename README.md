angular-pickadate.js
====================

Angular directives for pickadate.js

```html
<input class="field datetimepicker"
   type="text" 
   name="date" 
   ng-model="ctrl.date" 
   pick-a-date="" 
   min-date="1" 
   required="required" 
/>
<div class="error-messages"
  ng-messages="dateForm.date.$error"
  ng-if="dateForm.$submitted || dateForm.dateFrom.$drity"
>
  <div class="message slide-left"
    ng-message="required"
  >
    You did not enter a field name
  </div>
</div>
```
