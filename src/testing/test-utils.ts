import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

export async function createStableFixture<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  const fixture = TestBed.createComponent(component);
  await fixture.whenStable();
  return fixture;
}

export async function stabilize(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
}
