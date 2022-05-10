import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export const queryByDataTest = <T>(fixture: ComponentFixture<T>, dataTest: string) => {
  return fixture.debugElement.query(By.css(`[data-test="${dataTest}"]`));
};

export const queryAllByDataTest = <T>(fixture: ComponentFixture<T>, dataTest: string) => {
  return fixture.debugElement.queryAll(By.css(`[data-test="${dataTest}"]`));
};
