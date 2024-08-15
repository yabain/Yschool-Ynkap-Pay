import { Module } from "@nestjs/common"
import { EncryptionSecurityService } from "./encryption-security.service";

@Module({
    imports:[],
    providers:[EncryptionSecurityService],
    exports:[EncryptionSecurityService]
})
export class SecurityModule{}