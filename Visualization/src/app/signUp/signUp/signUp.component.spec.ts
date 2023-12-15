import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './signUp.component';
import { SignUpService } from '../../services/signUp.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import any = jasmine.any;


describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;
    let mockSignUpService: jest.Mocked<SignUpService>;
    let mockActivatedRoute: Partial<ActivatedRoute>;

    beforeEach(() => {
        mockSignUpService = {
            signUp: jest.fn(),
        } as any;

        mockActivatedRoute = {};

        TestBed.overrideProvider(ActivatedRoute, {useValue: mockActivatedRoute});


        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;

        component.signUpService = mockSignUpService;

    });

    it('should create the component', async () => {
        global.alert = jest.fn();
        expect(component).toBeTruthy();
    });

    it('should show alert if form is invalid', () => {
        const alertSpy = jest.spyOn(window, 'alert');
        component.signUp();
        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created correctly', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = 'email@isep.ipp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '269685863';
        password.value = 'P@ssword12';
        const role = 'Utente';
        consent.value = true;
        console.log(firstName.value, lastName.value, email.value, phoneNumber.value, NIF.value, password.value, consent.value);


        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('User account created');

    });

    it('User account created fail if firstName is not inserted', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;


        firstName.value = '';
        lastName.value = 'lastName';
        email.value = 'raul@gmail.com';
        phoneNumber.value = '910421512';
        NIF.value = '269685863';
        password.value = 'P@ssword12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });

    it('User account created fail if email does not has @isep.ipp.pt', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = 'raul@gmail.com';
        phoneNumber.value = '910421512';
        NIF.value = '269685863';
        password.value = 'P@ssword12';
        consent.value = true;
        console.log(firstName.value, lastName.value, email.value, phoneNumber.value, NIF.value, password.value, consent.value);

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');

    });

    it('User account created fail if phoneNumber does not start with 91|92|93|96', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '950421512';
        NIF.value = '269685863';
        password.value = 'P@ssword12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if phoneNumber has more than 9 digits', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '9504215121';
        NIF.value = '269685863';
        password.value = 'P@ssword12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if phoneNumber has less than 9 digits', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '95042151';
        NIF.value = '269685863';
        password.value = 'P@ssword12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if NIF has less than 9 digits', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.iopp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '26968586';
        password.value = 'P@ssword12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if NIF has more than 9 digits', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value ='1211094@isep.ipp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '2696858631';
        password.value = 'P@ssword12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if NIF is not portuguese', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '123456789';
        password.value = 'P@ssword12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if password has less than 10 characters', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '269685863';
        password.value = 'P@ssword';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if password has no numbers', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '269685863';
        password.value = 'Password';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if password has no uppercase letters', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '269685863';
        password.value = 'p@ssword12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if password has no lowercase letters', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '269685863';
        password.value = 'P@SSWORD12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if password has no special characters', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '269685863';
        password.value = 'Password12';
        consent.value = true;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please fill in all fields');
    });

    it('User account created fail if consent is not checked', async () => {
        const alertSpy = jest.spyOn(window, 'alert');

        const firstName = fixture.debugElement.queryAll(By.css('input'))[0].nativeElement;
        const lastName = fixture.debugElement.queryAll(By.css('input'))[1].nativeElement;
        const email = fixture.debugElement.queryAll(By.css('input'))[2].nativeElement;
        const phoneNumber = fixture.debugElement.queryAll(By.css('input'))[3].nativeElement;
        const NIF = fixture.debugElement.queryAll(By.css('input'))[4].nativeElement;
        const password = fixture.debugElement.queryAll(By.css('input'))[5].nativeElement;
        const consent = fixture.debugElement.queryAll(By.css('input'))[6].nativeElement;

        firstName.value = 'firstName';
        lastName.value = 'lastName';
        email.value = '1211094@isep.ipp.pt';
        phoneNumber.value = '910421512';
        NIF.value = '269685863';
        password.value = 'P@ssword12';
        consent.value = false;

        mockSignUpService.createUser.mockReturnValue(Promise.resolve(null));

        await component.signUp();

        expect(alertSpy).toHaveBeenCalledWith('Please accept the terms and conditions');
    });


});